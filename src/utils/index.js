const shortText = (text, maxLength = 12) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
}

export { shortText };