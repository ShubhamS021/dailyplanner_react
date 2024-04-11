// first solution. Better: use markdown https://www.npmjs.com/package/react-markdown
export const withLinks = (str: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.replace(urlRegex, (url) => {
        return `<a class="link" href="${url}" target="_blank" rel="noreferrer" data-attribute="hello" title="${url}">${url}</a>`;
    });
};
