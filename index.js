import React, {Component} from 'react';
import classnames from 'classnames'

class Select extends Component {
    state = {
        showOption: false,
        selected: null,
        hiddenValue: ''
    }
    componentDidMount() {
        document.addEventListener('click', (el) => {
            const select = el.path.find((item) => item === this.selected.parentNode)
            if (!select) {
                this.setState({
                    showOption: false
                })
            }
        })
    }

    get value() {
        return this.state.hiddenValue
    }

    showOption() {
        this.setState({
            showOption: true
        })
    }

    selectOption(data) {
        this.setState({
            selected: data,
            hiddenValue: data.value,
            showOption: false
        })
    }

    render() {
        const {showOption, hiddenValue} = this.state
        const {options = [], name, placeholder = '请选择'} = this.props
        const placeholderElement = <span className='placeholder'>{placeholder}</span>
        return (
            <div className='select'>
            <input type='hidden' value={hiddenValue} name={name} />
        <div
        className='selected'
        ref={(selected) => (this.selected = selected)}
        onClick={() => this.showOption()}
    >
    <span
        className='selected-name'
            >
            {
                hiddenValue ? hiddenValue : placeholderElement
            }
            </span>
            <span className={classnames('dropdown-caret', showOption && 'dropdown-caret-hover')} />
        </div>
        <div className='option-list' style={{display: showOption ? 'block': 'none'}}>
        {
            options.map((item) => {
                return (
                    <div
                key={item.value}
                className='option-item'
                onClick={(el) => this.selectOption(item, el)}
            >
                {item.name}
            </div>
            )
            })
        }
    </div>
        </div>
    );
    }
}

export default Select;
