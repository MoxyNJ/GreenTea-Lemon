import React, { PureComponent } from "react";
import store from "../store";

export function connect(mapStateToProps, mapDispatchToProps) {
  // 返回一个高阶组件，其本质是一个函数
  return function enhanceHOC(WrappedComponent) {
    return class extends PureComponent {
      constructor(props) {
        super(props);

        this.state = {
          storeState: mapStateToProps(store.getState()),
        };
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({
            storeState: mapStateToProps(store.getState()),
          });
        });
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...mapStateToProps(store.getState())}
            {...mapDispatchToProps(store.dispatch)}
          />
        );
      }
    };
  };
}
