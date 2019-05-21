// src/reducers/cart-reducer.js

import { UPDATE_CART,DELETE_FROM_CART,CHANGE_LOCALE } from '../actions/lang-actions';
import {setLang} from '@/config/i18n'

const initialState = {
  cart: [
    {
      product: 'bread 700g',
      quantity: 2,
      unitCost: 90
    },
    {
      product: 'milk 500ml',
      quantity: 1,
      unitCost: 47
    }
  ],
  locale:""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART: {
      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }
    case DELETE_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter(item => item.product !== action.payload.product)
      }
    }
    case CHANGE_LOCALE: {
      setLang(action.locale)
      return {
        ...state,
        locale: action.locale
      }
    }
    default:
      return state;
  }
}