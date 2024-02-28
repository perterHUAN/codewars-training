class Thing {
  // TODO: Make the magic happen

  /*
    const jane = new Thing('jane');
    console.log(jane.name) => 'jane'
  */
  constructor(name) {
    this.name = name;

    /*
      can
        jane.can.speak(phrase => `${name} says: ${phrase}!`)
        jane.speak('Hello') => 'jane says: Hello!'
      where to find name ? => this
      
      solution:
        hack use globalThis variable
        
        
      enhance
        jane.can.speak('spoke', phrase => `${name} says: ${phrase}!`);
        jane.speak('hi');
        expect(jane.spoke).to.deep.equal(['Jane says: hi!']);
        
        store the phrase spoken in the attribute which is specified by the first parameter.
    */
    this.can = {
      speak: (name, callback) => {
        this.speak = (...args) => {
          if (typeof name === "function") callback = name;

          let res;
          const tmp = globalThis.name;
          globalThis.name = this.name;
          console.log("globalThis.name", globalThis.name);
          res = callback(...args);
          // store the phrase spoken if the first parameter's type is string.
          if (typeof name === "string") {
            if (this[name]) {
              this[name].push(res);
            } else {
              this[name] = [res];
            }
          }
          globalThis.name = tmp;
          return res;
        };
      },
    };
  }
  /*
    is_a
      jane.is_a.woman
      jan.is_a_woman => true
  */
  is_a = new Proxy(
    {},
    {
      get: (target, prop) => {
        Object.defineProperty(this, `is_a_${prop}`, {
          value: true,
        });
      },
    }
  );

  /*
    is_not_a
      jane.is_not_a.woman
      jan.is_a.woman => false
  */
  is_not_a = new Proxy(
    {},
    {
      get: (target, prop) => {
        Object.defineProperty(this, `is_a_${prop}`, {
          value: false,
        });
      },
    }
  );

  /*
    has
       jane.has(2).arms  => jane.arms [new Things('arm'), new Things('arm')]
       jane.has(1).head => jane.head new Things('head')
  */
  has(n) {
    return new Proxy(
      {},
      {
        get: (target, prop) => {
          console.log("call get", prop);
          if (n === 1) {
            console.log("n === 1");
            Object.defineProperty(this, prop, {
              value: new Thing(prop),
            });
          } else {
            console.log("n > 1");
            const single = prop.replace(/s$/, "");
            Object.defineProperty(this, prop, {
              value: Array.from({ length: n }, () => new Thing(single)),
            });
          }
          /*
            jane.has(1).head.having(2).arms
            jane.has(1).head return a new Thing instance
          */
          return this[prop];
        },
      }
    );
  }
  /*
    having works like has
  */
  having(n) {
    return this.has.call(this, n);
  }

  /*
    is_the
      jane.is_the.parent_of.jone => jane.parent_of === jone
  */

  is_the = new Proxy(
    {},
    {
      get: (target, prop) => {
        return new Proxy(
          {},
          {
            get: (innerTarget, innerProp) => {
              return (this[prop] = innerProp);
            },
          }
        );
      },
    }
  );
}
/*
  each
    jane.has(2).hands.each(hand => having(5).fingers)
    jane.has(2).hands [new Thing('hand'), new Thing('hand')] each method on Array
*/

Array.prototype.each = function (callback) {
  /*
    callback return
      [
        <name>, 
        [Things...] | Things
      ]
    correct return structure to adapat and_the
    [
      [<name1>, [Things..] | Things ],
      [<name2>, [Things..] | Things ]
    ]
    
  */
  this.forEach((item) => {
    const config = callback();
    for (const [key, value] of config.settings) {
      item[key] = value;
    }
  });
};

/*
  change the return structure
  {
  settings: [[..], [...]]
  }
*/
function having(n) {
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        if (n === 1)
          return {
            settings: [[prop, new Thing(prop)]],
          };
        else if (n > 1) {
          const single = prop.replace(/s$/, "");
          return {
            settings: [
              [prop, Array.from({ length: n }, () => new Thing(single))],
            ],
          };
        }
      },
    }
  );
}

/*
  jane.has(1).head.having(2).eyes.each(eye => being_the.color.green)
*/
// const being_the = new Proxy({}, {
//   get: (target, prop) => {
//     return new Proxy({}, {
//       get: (innerTarget, innerProp) => {
//         return [prop, innerProp];
//       }
//     })
//   }
// })

/*
  jane.has(2).eyes.each(eye => being_the.color.blue.and_the.shape.round)
*/

function proxyFactory(config) {
  return new Proxy(config || {}, {
    get: (target, prop) => {
      return new Proxy(target || {}, {
        get: (innerTarget, innerProp) => {
          return {
            settings: [[prop, innerProp]].concat(innerTarget.settings || []),
            and_the: proxyFactory({
              settings: [[prop, innerProp]],
            }),
          };
        },
      });
    },
  });
}

const being_the = proxyFactory();

export default Thing;
