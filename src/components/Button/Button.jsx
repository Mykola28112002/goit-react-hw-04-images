import { Buttons } from './Button.styled';
import PropTypes from 'prop-types';


export const Button = ({clickLoadMore}) => {
    return (
    <Buttons onClick={clickLoadMore} type='button'>Load more</Buttons>
    )
};

Button.propTypes = {
  clickLoadMore: PropTypes.func
};
