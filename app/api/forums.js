
import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';

export default class ForumsApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async queryForums(params)  {

    params = stringifyUrlParams(params);

    return this.http.get(`api/v2014/discussions/forums`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
  
  async getForum(forumId)  {

    return this.http.get(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getThreads(forumId)  {

    return this.http.get(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}/threads`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getThread(threadId)  {

    return this.http.get(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getPosts(threadId)  {

    return this.http.get(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/posts`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getPost(postId)  {

    return this.http.get(`api/v2014/discussions/posts/${encodeURIComponent(postId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}
