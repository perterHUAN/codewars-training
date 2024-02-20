import generateBC from "./breadcrumb-generator.js";

// describe("generateBC", () => {
//   it("mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp", () => {
//     expect(
//       generateBC(
//         "mysite.com/very-long-url-to-make-a-silly-yet-meaningful-example/example.asp"
//       )
//     ).toBe(
//       '<a href="/">HOME</a> > <a href="/very-long-url-to-make-a-silly-yet-meaningful-example/">VLUMSYME</a> > <span class="active">EXAMPLE</span>'
//     );
//   });
// });

console.log(generateBC("www.agcpartners.co.uk/", " : "));
