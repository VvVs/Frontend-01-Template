# 注册OAuth
## *Github Api*
1. 打开 [*Github Api*]("https://developer.github.com/v3/")
2. [*使用其中的 Authentication*]("https://developer.github.com/v3/#authentication")
3. [*创建步骤*]("https://developer.github.com/apps/building-oauth-apps/")
    1. *Creating an OAuth App*
    2. *Creating custom badges for OAuth Apps*
    3. *Authorizing OAuth Apps*
        - __注意事项__
            - redirect_uri 需要编码后使用
            - 授权认证跳转后会在url中带有code 这个code类似于入场券的作用 不要理解为token 这个code用来换token使用的 不然会导致token直接在url中导致风险
            - 要注意同源策略问题 测试时可以再github主页上进行测试 返回的access_token就是通行令牌
            - 拿到access_token就可以调用github的其他的api
    4. *Understanding Scopes for OAuth Apps*