export async function apiCall (url: string, params: any) {
    return await fetch(url, {
        ...params,
        method: params.method || "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params.body || {}),
    }).then(response => response.json())
}