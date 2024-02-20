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

console.log(
  generateBC(
    "https://codewars.com/bladder-with-cauterization-paper-or-skin-kamehameha-bioengineering/and-biotechnology-for-eurasian/profiles/in-eurasian-immunity-transmutation-insider?hack=off",
    " : "
  )
);
