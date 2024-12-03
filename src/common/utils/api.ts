// api.ts

export interface ApiOptions<BodyType> {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: BodyType;
    queryParams?: Record<string, string | number | boolean>;
  }
  
  export async function apiFetch<BodyType,ReturnType>(
    url: string,
    options: ApiOptions<BodyType> = {}
  ): Promise<ReturnType> {
    const {
      method = 'GET',
      headers = {},
      body = null,
      queryParams = {},
    } = options;
  
    try {
      const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
  
      const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      const mergedHeaders = { ...defaultHeaders, ...headers };
  
      const fetchOptions: RequestInit = {
        method,
        headers: mergedHeaders,
      };
  
      if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
        fetchOptions.body = JSON.stringify(body);
      }
  
      const response = await fetch(fullUrl, fetchOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = (await response.json()) as ReturnType;
      return data;
    } catch (error) {
      console.error('API Fetch Error:', error);
      throw error;
    }
  }
  
  