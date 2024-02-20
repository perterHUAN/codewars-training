function generateBC(url, separator) {
  /*
        1. todo: separate url by '/'
        mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp
        ['mysite.com', 'very-long-url-to-make-a-silly-yet-meaningful-example', 
        'example.asp']
        
        notice: 
            https://<host><path>    change the split rule from '/' to /(?<=\w\//)/
            baidu.com/ => ["baidu.com", ""] so we should filter the empty string
    */
  const parts = url.split(/(?<=\w)\//).filter((e) => e !== "");

  /*
        2. todo: change the url array according to the title requirement.
        title requirement:
            1. labelling it always HOME    ✔ 
            2. if the name of the last element is index.something,
            you treat it as if it wasn't there, sending users automatically
            to the upper level folder.  ✔
            3. ignore anchor , file extension and search params ✔
    */
  parts[0] = "/";
  let last = parts[parts.length - 1];
  if (/^index/.test(last)) parts.pop();
  else {
    const anchorIdx = last.match(/#/)?.index;
    if (anchorIdx) last = last.slice(0, anchorIdx);

    const extensionIdx = last.match(/\./)?.index;
    if (extensionIdx) last = last.slice(0, extensionIdx);

    const searchIdx = last.match(/\?/)?.index;
    if (searchIdx) last = last.slice(0, searchIdx);
    parts[parts.length - 1] = last;
  }
  /*
        3. todo: generate the final result based on url array
        <a href="/">HOME</a> * <a href="/hello/">...   * <span class="active">LAST</span>        
            1. a url composed of more words separated by - and 
            equal or less than 30 characters long needs to be 
            just uppercased with hyphens replaced by spaces.
            2. if one element is longer than 30 characters, you have to shorten
            it, acronymizing it(i.e.: taking just the initials of every word).
            ignore the word in  ["the","of","in","from","by","with","and", "or", "for", "to", "at", "a"]
            when acronymizing.
            3. use separator as the second parameter to join them.
            
    */
  function acronym(part) {
    const ignore = [
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
      .filter((e) => !ignore.includes(e))
      .map((e) => e[0].toUpperCase())
      .join("");
  }
  function generateValidPart(part) {
    if (part === "/") return "HOME";
    if (part.length < 30) {
      return part
        .split("-")
        .map((e) => e.toUpperCase())
        .join(" ");
    } else {
      return acronym(part);
    }
  }
  let result = [];
  let currUrl = "";
  for (let i = 0; i < parts.length; ++i) {
    currUrl = currUrl + parts[i] + (i !== parts.length && i !== 0 ? "/" : "");

    /*
            not last part
            
        */
    let tag = "a";
    let content = generateValidPart(parts[i]);
    let href = currUrl;
    let className = "";

    if (i === parts.length - 1) {
      tag = "span";
      href = "";
      className = "active";
    }

    let html = "";
    if (tag === "a") {
      html = `<a href="${href}">${content}</a>`;
    } else html = `<span class="${className}">${content}</span>`;
    result.push(html);
  }
  return result.join(separator);
}

export default generateBC;
