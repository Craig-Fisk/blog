import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Provider } from '@preact/prerender-data-provider';
import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Blogs from '../routes/blogs';
import Blog from '../routes/blog';
import Projects from '../routes/projects';
import Project from '../routes/project';
import Resume from '../routes/resume';
import NotFoundPage from '../routes/notfound';

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](https://github.com/preactjs/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = (e) => {
		this.currentUrl = e.url;
	};

	render(props) {
		return (
			<Provider value={props}>
				<div id="app">
					<Header />
					<Router onChange={this.handleRoute}>
						<Home path="/" />
						<Blogs path="/blogs/" />
						<Blog path="/blog/:name" />
						<Projects path="/projects/" />
						<Project path="/projects/:name" />
						<Resume path="/resume/" />
						<NotFoundPage type="404" default />
					</Router>
				</div>
			</Provider>
		);
	}
}
