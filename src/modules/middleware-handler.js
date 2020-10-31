const middlewareFactory = function (context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) {
    return context.next;
  }

  return async (...parameters) => {
    context.next(...parameters);

    const nextMiddleware = middlewareFactory(context, middleware, index + 1);
    await subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

const handle = async function (to, from, next, router) {
  if (!to.meta.middleware) {
    return;
  }

  const context = {
    from,
    next,
    router,
    to,
  };
  const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];
  const nextMiddleware = middlewareFactory(context, middleware, 1);

  return await middleware[0]({ ...context, next: nextMiddleware });
}

export default {
  handle,
}
