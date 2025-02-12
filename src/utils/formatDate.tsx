export function formatDate(date:any) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    };
    return date.toLocaleString('ru-RU', options).replace(',','');
  }