const fs = require('fs');
const colores = require('./colores').colores;
const purgeLabel = colores.purgeLabel;

if (!fs.existsSync('./tss')) {
	fs.mkdirSync('./tss')
}

(function constructor() {
	'use strict';

	const helpers = require('./helpers');

	const defaultConfigTheme = require('tailwindcss/defaultTheme');

	const tailwindui = require('@tailwindcss/ui/index')({}, {}).config.theme;

	// Reset Styles ( Preflight in Tailwind lingo )
	// Some reseting has to be so everything else work as intended.
	saveFile('./tss/reset.tss', '// purgeTSS\n// Created by César Estrada\n// https://github.com/macCesar/purgeTSS\n' + helpers.resetStyles());

	// Template
	let convertedStyles = fs.readFileSync('./lib/templates/tailwind-template.tss', 'utf8');

	// color
	convertedStyles += helpers.textColor(tailwindui.colors);

	// backgroundColor
	convertedStyles += helpers.backgroundColor(tailwindui.colors);

	// borderColor
	convertedStyles += helpers.borderColor(tailwindui.colors);

	// placeholderColor
	convertedStyles += helpers.placeholderColor(tailwindui.colors);

	// Background Gradient
	convertedStyles += helpers.backgroundGradient();

	// Gradient Color Stops
	convertedStyles += helpers.gradientColorStops(tailwindui.colors);

	// Object Position
	convertedStyles += helpers.placement();

	// Font Sizes
	convertedStyles += helpers.fontSize(defaultConfigTheme.fontSize);

	// Font Style
	convertedStyles += helpers.fontStyle();

	// Font Weight
	convertedStyles += helpers.fontWeight(defaultConfigTheme.fontWeight);

	// Text Align
	convertedStyles += helpers.textAlign();

	// Vertical Alignment
	convertedStyles += helpers.verticalAlignment();

	// Border Radius
	// convertedStyles += helpers.borderRadius(defaultConfigTheme.borderRadius);

	// Border Radius ( Extra Styles )
	convertedStyles += helpers.borderRadiusExtraStyles({ ...{ none: 0, sm: '0.125rem', default: '0.25rem', md: '0.375rem', lg: '0.5rem' }, ...tailwindui.spacing });

	// Border Width
	convertedStyles += helpers.borderWidth(defaultConfigTheme.borderWidth);

	// Margin
	convertedStyles += helpers.margin(tailwindui.spacing, true);

	// Padding
	convertedStyles += helpers.padding(tailwindui.spacing);

	// Sizing
	convertedStyles += helpers.width({ ...defaultConfigTheme.width(theme => ({})), ...tailwindui.spacing });
	convertedStyles += helpers.height({ ...defaultConfigTheme.height(theme => ({})), ...tailwindui.spacing });

	// Box Shadow
	convertedStyles += helpers.shadow();

	// Opacity
	convertedStyles += helpers.opacity(defaultConfigTheme.opacity);

	// Interactivity
	convertedStyles += helpers.interactivity();

	saveFile('./tss/tailwind.tss', convertedStyles);
}());

function saveFile(file, data) {
	fs.writeFileSync(file, data, err => {
		throw err;
	});

	console.log(`${purgeLabel} '${file}' file created!`);
}
