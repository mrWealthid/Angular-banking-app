import {HttpParams} from "@angular/common/http";

export const globalizeDate = () => {
  const now = new Date();
  const options: any = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'short',
  };

  const locale = navigator.language;

  return new Intl.DateTimeFormat(locale, options).format(now);
};


//This helps append to URl all queries for our list page.
export function createParams(params: any) {
  let queryParams = new HttpParams();
  let newObj = {
    ...params.search,
    limit: params.limit,
    page: params.pageNumber + 1,
    sort: '-createdAt, -_id'
  }
  return queryParams.appendAll(newObj)
}





export function calculateInterest(principal: number, rate: number, time: number) {
  /*
  Calculates the interest using the simple interest formula.

  Arguments:
  principal -- The principal amount.
  rate -- The interest rate.
  time -- The time period in months.

  Returns:
  The calculated interest.
  */
  const interest = (principal * rate * time) / 100;

  return {interest, payable: interest + principal}
}

export function getMonthInWords() {

  const dateString = Date.now()
  const dateObject = new Date(dateString);

// Get the month in word format
const monthInWord = new Intl.DateTimeFormat('en', { month: 'long' }).format(dateObject);
return monthInWord
}