import * as React from 'react';
import { ActionForm } from './action-form';
import { config } from './config';
import {
  ServiceTabs,
  ActionSelect,
  StateMonitor,
  stateToString,
} from './redux-service-demo.components';

export class ReduxServiceDemo extends React.Component {
  constructor(props) {
    super(props);
    const allServices = Object.keys(props.services);
    const activeService = allServices[0];
    const activeAction = Object.keys(props.services[activeService].types)[0];
    this.state = {
      activeService,
      activeAction,
      stateString: stateToString(props.store.getState())
    };
    this.handleActionSelect = this.handleActionSelect.bind(this);
    this.handleServiceSelect = this.handleServiceSelect.bind(this);
    props.store.subscribe(state => this.setState({ stateString: stateToString(props.store.getState()) }));
  }

  handleActionSelect(event) {
    const activeAction = event.target.value;
    this.setState({ activeAction });
  }

  handleServiceSelect(event) {
    const activeService = event.target.id;
    const activeAction = Object.keys(this.props.services[activeService].types)[0];
    this.setState({ activeService, activeAction });
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title has-text-centered">{config.title}</h1>
          <ServiceTabs
            services={this.props.services}
            activeService={this.state.activeService}
            handleServiceSelect={this.handleServiceSelect}/>
          <ActionSelect
            services={this.props.services}
            activeService={this.state.activeService}
            handleActionSelect={this.handleActionSelect}
          />
          <ActionForm
            activeService={this.state.activeService}
            activeAction={this.state.activeAction}
            services={this.props.services}
            store={this.props.store}
          />
          <StateMonitor
            stateString={this.state.stateString}
          />
        </div>
      </section>
    );
  }
}
