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
