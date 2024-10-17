const tester = {
  el: {},
  init() {
    // const sum = (a, b) => a + b
    // const subtract = (a, b) => a - b
    // const multiply = (a, b) => a * b
    // const divide = (a, b) => a / b

    const elvenShieldRecipe = {
      leatherStrips: 2,
      ironIngot: 1,
      refineMoonstone: 4,
    }

    // ES7 object spread example
    const elvenGauntletsRecipe = {
      ...elvenShieldRecipe,
      leather: 1,
      refinedMoonstone: 1,
    }

    console.log('ES5 Object.keys examples', Object.keys(elvenGauntletsRecipe))
    console.log('ES7 object spread example', elvenGauntletsRecipe)
    console.log('ES8 Object.values examples', Object.values(elvenGauntletsRecipe))
  },
}

export default tester
