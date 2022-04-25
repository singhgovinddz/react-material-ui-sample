const convertIsoToLocal = (date) => {
    const _date = date.substring(0, date.indexOf('T')).split('-');
    return `${_date[1]}/${_date[2]}/${_date[0]}`;
}

const getReadableDate = ({date, startTime, endTime}) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const _date = new Date(date);
    const formattedDate  = new Intl.DateTimeFormat('en-US', {month:'2-digit',day:'2-digit', year:'numeric'}).format(_date);
    
    const slotFrom = startTime > 12 ? startTime - 12 + ' PM' : startTime + ' AM';
    const slotTo = endTime > 12 ? endTime - 12 + ' PM' : endTime + ' AM';
    
    return `${days[_date.getDay()]}. ${formattedDate} ${slotFrom} - ${slotTo}`;

}

const getReadableDay = (date) => {
    const daysArray = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const _newDate = convertIsoToLocal(date)
    const _date = _newDate.split('/');
    const newDate = new Date(_date[2], _date[0] - 1, _date[1]);
    const mmddyy = _newDate.split('/')[0]+'/'+_newDate.split('/')[1]+'/'+_newDate.split('/')[2]
    return `${daysArray[newDate.getDay()]}. ${mmddyy} `;
}


const getReadableSlots = (slot) => {

    const slotFrom = slot.startTime > 12 ? slot.startTime - 12 : slot.startTime;
    const slotTo = slot.endTime > 12 ? slot.endTime - 12 + ' PM' : slot.endTime + ' AM';

    return ` ${slotFrom} - ${slotTo}`;
}

const toTitleCase = (a) => {
    let splitted = a && a.split('_');
    return splitted.map(word => word.toLowerCase()[0].toUpperCase() + word.toLowerCase().slice(1)).join(' ');
  }

const getUtcDate = (date, hour, correction = 0) => {
    const newDate  = new Date(date);
    const dateTime = new Date(newDate.setHours(hour, 0, 0, 0))
    const _utcMonth = dateTime.getUTCMonth() + correction;
    const _utcHour = dateTime.getUTCHours()
    const _utcSeconds = dateTime.getUTCSeconds()
    const _utcMinutes = dateTime.getUTCMinutes()
    const _utcDate = dateTime.getUTCDate()
    const utcHour = _utcHour > 9 ? _utcHour : '0' + _utcHour;
    const utcSeconds = _utcSeconds > 9 ? _utcSeconds : '0' + _utcSeconds
    const utcMinutes = _utcMinutes > 9 ? _utcMinutes : '0' + _utcMinutes
    const utcMonth = _utcMonth > 9 ? _utcMonth : '0' + _utcMonth
    const utcDate = _utcDate > 9 ? _utcDate : '0' + _utcDate
    const utcString =  newDate.getUTCFullYear().toString()+ utcMonth + utcDate + 'T' + utcHour + utcMinutes + utcSeconds + 'Z'; 
    return utcString
}
const orderStatus=(text,order)=>{
   
}

export {
    getReadableDate,
    convertIsoToLocal,
    getReadableDay,
    getReadableSlots,
    toTitleCase,
    getUtcDate,
    orderStatus
};