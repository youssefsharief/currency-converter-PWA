import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
// import { ApiService } from '../../../services/data.service';
// import { toast } from 'react-toastify';
import formSchema from './validationSchema';
import { ApiService } from '../../../services/data.service';
import { idbCurrencyRate } from '../../../indexDB/ratePairs';

export const EnhancedForm = withFormik({
	validationSchema: formSchema,
	mapPropsToValues: (props) => {
		return {
			currencies: props.currencies, startCurrency: '', endCurrency: '', amount: ''
		}
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		const currencyPair = `${values.startCurrency}_${values.endCurrency}`;
		const reversedCurrencyPair = `${values.endCurrency}_${values.startCurrency}`;
		idbCurrencyRate.count(currencyPair).then(x => {
			if (!x) {
				ApiService.convert(currencyPair).then(rate => {
					saveToDb(currencyPair, reversedCurrencyPair, rate)
					props.resultReceived(rate, values.amount, values.startCurrency, values.endCurrency)
					setSubmitting(false)
				}).catch(err => {
					setSubmitting(false)
				})
			} else {
				idbCurrencyRate.getPair(currencyPair).then(payload=>{
					props.resultReceived(payload.rate, values.amount, values.startCurrency, values.endCurrency)
					setSubmitting(false)
				})
			}
		}).catch(err => {
			
		})

	},
	displayName: 'Form',

})(InnerForm);




function saveToDb(currencyPair, reversedCurrencyPair, rate) {
	idbCurrencyRate.saveToDb({ pairs: currencyPair, rate });
	idbCurrencyRate.saveToDb({ pairs: reversedCurrencyPair, rate: 1 / rate });
}