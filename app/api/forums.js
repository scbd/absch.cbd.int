import axios from 'axios'
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

  async createThread (forumId, { subject, message, attachments })  {

    var data = {
      subject,
      message,
      attachments
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

  async createPost(parentId, { subject, message, attachments })  {

    var data = {
      subject,
      message,
      attachments
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

  async updatePost(postId, { subject, message, attachments })  {

    var data = {
      subject,
      message,
      attachments
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

  // ATTACHMENTS

  async uploadAttachment(forumId, htmlFileObject)  {

    const { name: filename, size } = htmlFileObject;

    const slot = await this.http.post(`api/v2014/discussions/attachments`, { filename, forumId }).then(res => res.data).catch(tryCastToApiError);
    const me   = await this.http.get (`api/v2013/authentication/user`).then(res => res.data).catch(tryCastToApiError);

    const { url: putUrl, ...file } = slot;
    const { contentType } = file;

    const headers = {
      'Content-Type': contentType,
      'x-amz-meta-user' : me.userID,
      'x-amz-meta-filename' : filename,
      'x-amz-meta-forum-id' : forumId,
    };

    const result = await axios.put(putUrl, htmlFileObject, { headers }).catch(tryCastToApiError);

    const { guid : attachmentId } = file;

    return { size, attachmentId, ...file };
  }

  async getAttachmentDirectUrl(attachmentId)  {

    const result = await this.http.get(`api/v2014/discussions/attachments/${encodeURIComponent(attachmentId)}`)
                             .then(res => res.data)
                             .catch(tryCastToApiError);

    return result
  }


  // SUBSCRIPTIONS

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

  // PIN

  async pinThread(threadId)  {

    return this.http.put(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/pin`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async unpinThread(threadId)  {

    return this.http.delete(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/pin`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  // Close

  async closeThread(threadId)  {

    return this.http.put(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/close`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async openThread(threadId)  {

    return this.http.delete(`api/v2014/discussions/threads/${encodeURIComponent(threadId)}/close`)
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getForumParticipants(forumId, treaty=null)  {

    treaty = treaty || undefined;

    const params = {
      treaty
    };

    return this.http.get(`/api/v2014/discussions/forums/${encodeURIComponent(forumId)}/participants`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }
}
