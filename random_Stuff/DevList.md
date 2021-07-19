# Dev Notes

## Nginx Options (for proxies)

```
location / {
    proxy_pass                      http://example.com;
    proxy_set_header                Host example.com;
    proxy_set_header                X-Real-IP $remote_addr;
    proxy_pass_request_headers      on;
}
```