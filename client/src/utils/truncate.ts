const truncate = (value: string, length: number) => {
  const truncateValue = value.length;

  return truncateValue < length ? value : value.slice(0, length) + '...'
}

export default truncate
