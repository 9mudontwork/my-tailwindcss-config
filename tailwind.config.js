const createFontSize = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		if (index % 2 == 0) {
			items[`${index}px`] = `${index / 16}rem`
		}
	}

	return items
}

const createEvenPlusMinus = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		if (index % 2 == 0) {
			items[`${index}px`] = `${index}px`
			items[`-${index}px`] = `-${index}px`
		}
	}

	return items
}

const createOpacity = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		if (index % 5 == 0) {
			items[`${index}`] = `${index / 100}`
		}
	}

	return items
}

const createFlexGrow = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		if (index % 5 == 0) {
			items[`grow-${index}`] = `1 0 ${index}%`
		}
	}

	return items
}

const createFlexShrink = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		if (index % 5 == 0) {
			items[`shrink-${index}`] = `0 1 ${index}%`
		}
	}

	return items
}

const createPlus = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		items[`${index}px`] = `${index}px`
	}

	return items
}

const createPlusMinus = (start, end) => {
	let items = {}

	for (let index = start; index <= end; index++) {
		items[`${index}px`] = `${index}px`
		items[`-${index}px`] = `-${index}px`
	}

	return items
}

let colors = {
	white: '#ffffff',
	black: '#000000',

	gray1: '#DDDDDD',
	gray2: '#4C5155',
	gray3: '#A8A9AA',
	gray4: '#7A7A7A',
	gray4: '#D2D2D2',
	gray5: '#E4E4E4',
	gray6: '#939393',
	gray7: '#F3F3F3',
	gray8: '#656666',

	blue1: '#0071C1',
	blue2: '#407AFE',
	blue3: '#EFF8FF',
	blue4: '#C6D8FF',
	blue5: '#6A90E6',
	blue6: '#ECECFA',
	blue7: '#113FA9',
	blue8: '#E2F3FF',

	purple1: '#250081',

	green1: '#00C1C1',

	yellow1: '#CBB944',

	red1: '#E81C1C',
}

let screen = {
	xs: '320px',
	// sm: '640px',
	md: '768px',
	// lg: '1024px',
	// xl: '1280px',
}

const plugin = require('tailwindcss/plugin')

module.exports = {
	prefix: 'tw-',
	purge: {
		content: [
			'./frontend/**/*.php',
			'./frontend/**/*.js',
			'./backend/**/*.css',
			'./backend/**/*.js',
		],
	},
	theme: {
		fontSize: createFontSize(12, 80),
		margin: createPlusMinus(0, 100),
		padding: createPlusMinus(0, 100),
		screens: screen,
		colors: colors,
		extend: {
			flex: {
				...createFlexGrow(5, 100),
				...createFlexShrink(5, 100),
			},

			fontFamily: {
				propmt: 'Prompt, sans-serif',
				sarabun: 'Sarabun, sans-serif',
				arial: 'Arial, sans-serif',
			},

			opacity: createOpacity(5, 95),
			backgroundOpacity: createOpacity(5, 95),

			width: createPlus(1, 1000),
			minWidth: createPlus(1, 1000),
			maxWidth: createPlus(1, 1000),

			height: createPlus(1, 1000),
			minHeight: createPlus(1, 1000),
			maxHeight: createPlus(1, 1000),

			/** LRTB */
			inset: createPlusMinus(0, 200),

			borderWidth: createPlus(1, 20),

			boxShadow: {
				1: 'rgba(100, 100, 111, 0.2) 0px 7px 30px 0px',
			},
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
	// corePlugins: [],
}
