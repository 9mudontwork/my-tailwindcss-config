const remFontSize = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index += 2) {
    items[`${index}px`] = `${index / 16}rem`
  }

  return items
}

const remPlusMinus = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index++) {
    items[`${index}px`] = `${index / 16}rem`
    items[`-${index}px`] = `-${index / 16}rem`
  }

  return items
}

const pxPlusMinus = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index++) {
    items[`${index}px`] = `${index}px`
    items[`-${index}px`] = `-${index}px`
  }

  return items
}

const opacity = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index += 5) {
    if (index % 5 == 0) {
      items[`${index}`] = `${index / 100}`
    }
  }

  return items
}

const pxPlus = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index++) {
    items[`${index}px`] = `${index}px`
  }

  return items
}

const remPlus = (start, end) => {
  let items = {}
  for (let index = start; index <= end; index++) {
    items[`${index}px`] = `${index / 16}rem`
  }

  return items
}

const flexGrow = () => {
  let items = {}
  for (let index = 0; index <= 12; index++) {
    items[`grow-${index}`] = `1 0 ${(index / 12) * 100}%`
  }

  return items
}

const flexShrink = () => {
  let items = {}
  for (let index = 0; index <= 12; index++) {
    items[`shrink-${index}`] = `1 0 ${(index / 12) * 100}%`
  }

  return items
}

const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: remFontSize(12, 100),
    margin: remPlusMinus(0, 100),
    padding: remPlusMinus(0, 100),
    extend: {
      flex: {
        ...flexGrow(),
        ...flexShrink(),
      },

      fontFamily: {
        propmt: 'Prompt, sans-serif',
        sarabun: 'Sarabun, sans-serif',
      },

      opacity: opacity(5, 95),
      backgroundOpacity: opacity(5, 95),

      width: pxPlus(1, 1000),
      minWidth: pxPlus(1, 1000),
      maxWidth: pxPlus(1, 1000),

      height: pxPlus(1, 1000),
      minHeight: pxPlus(1, 1000),
      maxHeight: pxPlus(1, 1000),

      /** LRTB */
      inset: remPlusMinus(0, 200),

      borderWidth: pxPlus(1, 20),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      cursor: ['important'],
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const textIndent = () => {
        let textIndent = new Object()
        for (let index = 1; index < 5; index++) {
          textIndent[`.text-indent-${index}rem`] = {
            'text-indent': `${index}rem`,
          }
        }
        return textIndent
      }

      addUtilities(textIndent(), ['responsive'])
    }),

    // https://github.com/tailwindlabs/tailwindcss/issues/493
    // https://tailwindcss.com/docs/plugins#complex-variants
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls((decl) => {
            decl.important = true
          })
        })
      })
    }),
  ],
}
