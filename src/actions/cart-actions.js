// src/reducers/cart-actions.js
export const UPDATE_CART = 'UPDATE_CART';
export const DELETE_FROM_CART = 'DELETE_FROM_CART';
export const CHANGE_LOCALE= 'CHANGE_LOCALE'
export function updateCart(product, quantity, unitCost) {
  return {
    type: UPDATE_CART,
    payload: {
      product,
      quantity,
      unitCost
    }
  }
}

export function deleteFromCart(product) {
  return {
    type: DELETE_FROM_CART,
    payload: {
      product
    }
  }
}

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale
  }
}