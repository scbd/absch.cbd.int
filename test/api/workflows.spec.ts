import { describe, expect, it, vi } from 'vitest';
import WorkflowsApi from '~/api/workflows';

describe('WorkflowsApi.queryWorkflows', () => {
  it('builds q/l/s/sk/c params from filter, paging, and sort input', async () => {
    const workflowsApi = new WorkflowsApi();
    const query = { $and: [{ state: 'running' }] };
    workflowsApi.http.get = vi.fn().mockResolvedValue({ data: [{ _id: '1' }] });

    const result = await workflowsApi.queryWorkflows({ query, length: 15, skip: 30, sort: { createdOn: -1 } });

    expect(workflowsApi.http.get).toHaveBeenCalledWith('api/v2013/workflows', {
      params: {
        q: JSON.stringify(query),
        l: 15,
        sk: 30,
        s: JSON.stringify({ createdOn: -1 })
      }
    });
    expect(result).toEqual([{ _id: '1' }]);
  });

  it('requests a count with the c param and no paging/sort params', async () => {
    const workflowsApi = new WorkflowsApi();
    const query = { $and: [{ state: 'running' }] };
    workflowsApi.http.get = vi.fn().mockResolvedValue({ data: { count: 4 } });

    const result = await workflowsApi.queryWorkflows({ query, count: true });

    expect(workflowsApi.http.get).toHaveBeenCalledWith('api/v2013/workflows', {
      params: { q: JSON.stringify(query), c: true }
    });
    expect(result).toEqual({ count: 4 });
  });
});

describe('WorkflowsApi.getWorkflowFacets', () => {
  it('builds the fields/q params and returns the facet response', async () => {
    const workflowsApi = new WorkflowsApi();
    const query = { $and: [{ state: 'running' }] };
    const facetResponse = { notifications: [{ count: 1, value: '2024-100' }], organizations: [], government: [] };
    workflowsApi.http.get = vi.fn().mockResolvedValue({ data: facetResponse });

    const result = await workflowsApi.getWorkflowFacets({ query, fields: ['notifications', 'organizations', 'government'] });

    expect(workflowsApi.http.get).toHaveBeenCalledWith('api/v2013/workflows/facets', {
      params: { q: JSON.stringify(query), fields: 'notifications,organizations,government' }
    });
    expect(result).toEqual(facetResponse);
  });
});
