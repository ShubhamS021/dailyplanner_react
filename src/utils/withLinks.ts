// first solution. Better: use markdown https://www.npmjs.com/package/react-markdown
export const withLinks = (str: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.replace(urlRegex, (url) => {
        return `[${url}](${url})`;
    });
};
