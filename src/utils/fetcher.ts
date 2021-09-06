/**
 * Custom wrapper for the browser's fetch API
 *
 * @param param - FetchAPIProps
 * @returns Promise or object
 */
export default async function fetcher({
  api,
  body = {},
  options = { headers: {} },
  method = 'POST',
}: FetchAPIProps): Promise<any> {
  const ops: OpsParams = {
    method,
    redirect: 'follow',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  try {
    if (method !== 'GET' && method !== 'HEAD') ops.body = JSON.stringify(body)
    const response = await fetch(api, ops)
    let payload = null
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('application/json') >= 0) {
      payload = await response.json()
    } else {
      payload = await response.text()
    }
    if (response.status >= 200 && response.status <= 299) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return payload
    } else {
      return { error: response.status, body: payload }
    }
  } catch (error: any) {
    return { error: `${error.message}` }
  }
}

type OpsParams = {
  [key: string]: any
}

export interface FetchAPIProps {
  api: string
  body?: Record<string, any>
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'HEAD'
  options?: Record<string, any>
}
