
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

  async createThread (forumId, { subject, message })  {

    var data = {
      subject,
      message
    };

    return this.http.post(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}/threads`, data)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getThread(threadId)  {

    return this.http.get(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getPosts(postId, { all } = {})  {

    const params = stringifyUrlParams({
      type : all ? "flat" : undefined
    });
    
    return this.http.get(`api/v2014/discussions/posts/${encodeURIComponent(postId)}/posts`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async createPost(parentId, { message, subject })  {

    var data = {
      subject,
      message
    };

    return this.http.post(`api/v2014/discussions/posts/${encodeURIComponent(parentId)}/posts`, data)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getPost(postId)  {

    return this.http.get(`api/v2014/discussions/posts/${encodeURIComponent(postId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async updatePost(postId, { message, subject })  {

    var data = {
      subject,
      message
    };

    return this.http.put(`api/v2014/discussions/posts/${encodeURIComponent(postId)}`, data)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async deletePost(postId)  {

    return this.http.delete(`api/v2014/discussions/posts/${encodeURIComponent(postId)}`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getForumSubscription(forumId)  {

    return this.http.get(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async addForumSubscription(forumId)  {

    return this.http.put(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async deleteForumSubscription(forumId)  {

    return this.http.delete(`api/v2014/discussions/forums/${encodeURIComponent(forumId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }


  async getThreadSubscription(threadId)  {

    return this.http.get(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async addThreadSubscription(threadId)  {

    return this.http.put(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async deleteThreadSubscription(threadId)  {

    return this.http.delete(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/watch`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }  
}
