function generateBC(url, separator) {
  /*
        todo: extract the hostname and path part from url
              replace protocol, search parmas,ahchor to ''
    */
  let path = url.replace(/(https?:\/\/)|(\?.+)|(#.+)/g, "");
  /*
        todo: remove the /index.* or / at the end of path and the file extension.
  */
  path = path.replace(/(\/index)?\.(html?|(ph|as)p)|(\/$)/g, "");

  /*
        todo: separtate path with '/'
   */
  const parts = path.split("/");

  /*  
    todo: transform each element in parts array under title requirement.
    last element format: <span class="active">...</span>
    other elements format:＜a href="...">...</a>
    
    text content format:
    length <= 30   - => ' ', lower case => upper case
    length > 30 acronym
*/

  function acronym(part) {
    const removeList = [
      "the",
      "of",
      "in",
      "from",
      "by",
      "with",
      "and",
      "or",
      "for",
      "to",
      "at",
      "a",
    ];
    return part
      .split("-")
      .filter((e) => !removeList.includes(e))
      .map((e) => e[0].toUpperCase())
      .join("");
  }
  function generateValidPartContent(part) {
    if (part === "/") return "HOME";
    if (part.length <= 30) {
      return part
        .split("-")
        .map((e) => e.toUpperCase())
        .join(" ");
    } else {
      return acronym(part);
    }
  }
  let currentURL = "";
  return parts
    .map((part, i, parts) => {
      currentURL = currentURL + (i === 0 ? "/" : part + "/");
      if (parts.length === 1) return `<span class="active">HOME</span>`;
      else if (i === 0) return `<a href="/">HOME</a>`;
      else if (i === parts.length - 1)
        return `<span class="active">${generateValidPartContent(part)}</span>`;
      else
        return `<a href="${currentURL}">${generateValidPartContent(part)}</a>`;
    })
    .join(separator);
}

export default generateBC;
