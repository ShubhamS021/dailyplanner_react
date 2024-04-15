/**
 * Wraps links in a string with span tags
 * @param str - string containing links
 * @returns string with links wrapped in span tags
 */
export const withLinks = (str: string): string => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return str.replace(urlRegex, (url) => {
        return `<span class="link">${url}</span>`;
    });
};
