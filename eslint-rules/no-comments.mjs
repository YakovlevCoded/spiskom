const noComments = {
  meta: {
    type: "problem",
    docs: {
      description: "Запрещает комментарии в коде",
    },
    schema: [],
    messages: {
      forbidden: "Комментарии в коде запрещены",
    },
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          context.report({
            loc: comment.loc,
            messageId: "forbidden",
          });
        }
      },
    };
  },
};

export const noCommentsPlugin = {
  rules: {
    "no-comments": noComments,
  },
};
