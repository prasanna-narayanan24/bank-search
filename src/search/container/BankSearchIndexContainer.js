import BankSearchIndex from '../component/BankSearchIndex';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/bankSearchActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({bankSearch: state.bankSearch});
const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

export default connect(mapStateToProps, mapDispatchToProps)(BankSearchIndex);