export const withLinks = (str: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.replace(urlRegex, (url) => {
        return `<span class="link">[${url}](${url})</span>`;
    });
};
