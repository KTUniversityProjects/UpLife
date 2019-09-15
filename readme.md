# Boilerplate for projects
<br>
<h1>Base:</h1>
<ul>
	<li>	Babel, ESLint </li>
	<li>	HTML loader</li>
	<li>	File loader</li>
</ul>
<br>
<h1>Development:</h1>
<ul>
	<li>	Live server</li>
	<li>	Hot reloading</li>
	<li>	Prettier linting</li>
	<li>	Sass support</li>
</ul>
<br>
<h1>Production:</h1>
<ul>
	<li>	Bundling with hashed names</li>
	<li>	Optimizing CSS assets, minified CSS file</li>
	<li>	Clean Webpack plugin</li>
	<li>	Post CSS loader, prefixer.</li>
</ul>
<br>
<h1>Structure:</h1>
<ul>
	<li>	CSS modules are enabled. Follow component/container based structure.</li>
	<li>	Each component/container have their own independent styles. Variables are imported automatically. Do not import them manually.</li>
	<li>	Use Prettier Extension for linting.</li> 
	<li>	New variables/mixins/paths go to 'src/core/scss' folder files. Vars keep variables, main keeps global style. If you want to configure a new file, do so in the scss folder, just name it with the '_' prefix. Then include the file into the "_main.scss" file.</li> 
</ul>
