import * as Yup from 'yup';

const formSchema = Yup.object().shape({
    startCurrency: Yup.string().required('Required!'),
    endCurrency: Yup.string().required('Required!'),
    amount: Yup.number().required('Required!'),
})

export default formSchema