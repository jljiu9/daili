import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

async function handler(req: Request): Promise<Response> {
  let { pathname } = new URL(req.url);
  // pathname = pathname.replace('/','')
  // console.log(req.headers)
  let url = new URL(req.url)
  url.protocol = "https:";
  url.hostname = "cangku.moe";
  url.port = "443";
  if (pathname.startsWith('/cangku-file')) {
    let url = new URL(req.url)
    url.protocol = "https:";
    url.hostname = "file.cangku.moe";
    let res = await fetch(url.href.replace('/cangku-file',''))
    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  }
  if (pathname.startsWith('/cangku-pic')) {
    let url = new URL(req.url)
    url.protocol = "https:";
    url.hostname = "pic.cangku.moe";
    let res = await fetch(url.href.replace('/cangku-pic',''))
    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  }
  if (pathname.startsWith('/api')) {
    let res = await fetch(url.href, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    })
    // console.log(res.headers)
    // console.log(await res.text())
    let text = await res.text()
    // text = JSON.stringify(text)
    
    text = text.replaceAll('file.cangku.moe', 'daili.deno.dev/cangku-file')
    text = text.replaceAll('pic.cangku.moe', 'daili.deno.dev/cangku-pic')
    // console.log(text)
    // return new Response('text');
    return new Response(text, {
      status: res.status,
      headers: res.headers,
    });
  }
  
  if (pathname == '/login' || pathname == '/' ) {
    let res = await fetch('https://cangku.moe/login', {
      headers: req.headers,
      method: req.method,
      body: req.body,
    })
    // console.log(res.headers)
    // console.log(await res.text())
    let text = await res.text()
    text = text.replace('https://cangku.moe/api', '/api')
    return new Response(text, {
      status: res.status,
      headers: res.headers,
    });
  } else {
    return await fetch(url.href, {
      headers: req.headers,
      method: req.method,
      body: req.body,
    });
  }
}

serve(handler);
