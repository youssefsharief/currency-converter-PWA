import React from 'react'
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
import { EnhancedForm } from '../forms/MainForm/EnhancedForm';
import { ApiService } from '../../services/data.service';
import { idbCurrencyList } from '../../indexDB/listOfCurrencies';

export default class Converter extends React.Component {
	constructor(props) {
		super(props);
		this.state = { currencies: [] };
	}
	componentDidMount() {
		this.getCurrencyList()
	}

	getCurrencyList() {
		idbCurrencyList.count().then((count) => count ? this.getCurrenciesListFromIdb() : this.fetchForCurrencies());
	}

	fetchForCurrencies() {
		ApiService.getCurrencies().then((data) => {
			idbCurrencyList.saveToDb(data);
			const cuurenciesArr = Object.keys(data).map((key) => data[key])
			this.setState({ currencies: cuurenciesArr });
		})
	}

	getCurrenciesListFromIdb() {
		idbCurrencyList.getAll().then((response) => {
			this.setState({ currencies: response })
		});
	}

	handleSubmit = (rate, amount, startCurrency, endCurrency) => {
		this.setState({ rate, amount, startCurrency, endCurrency })
	}

	render() {
		return (
			<div>
				{
					this.state.currencies.length ?
						<div>
							<h2 className="mb-4">  </h2>
							<EnhancedForm currencies={this.state.currencies} resultReceived={this.handleSubmit} className="mb-4" />
							{
								this.state.rate ?
									<div className="mt-4">
										<h5 className="text-muted"> {this.state.amount} {this.state.currencies.find(cur=>cur.id===this.state.startCurrency).currencyName}  equals</h5>
										<h3> {this.state.amount * this.state.rate} {this.state.currencies.find(cur=>cur.id===this.state.endCurrency).currencyName}</h3>
									</div>
									:
									null
							}
						</div>
						:
						<p>Waiting</p>
				}
			</div>
		)
	}
}

Converter.propTypes = {
	disabled: PropTypes.any,
	match: PropTypes.any
}

