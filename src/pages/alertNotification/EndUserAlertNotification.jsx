import React, { useEffect, useState } from 'react'
import NotificationCard from '../../components/ui/card/NotificationCard'
import { useSelector } from 'react-redux'

export default function EndUserAlertNotification() {
  const theme = useSelector(state => state.theme.colors)

  // we can use Memo in this component to make it efficient, if data is large
  const Notifications = [
    {
      title: "Bill Generated",
      description: "Aug 2024 bill: $156.75",
      date: "August 15, 2024",
      time: "10:00 AM",
      details: "Your August 2024 utility bill has been successfully generated and is now available for viewing in your online portal. The total amount due is $156.75, which covers your electricity, water, and gas usage for the past billing cycle. Please review the usage breakdown and ensure payment is submitted before the due date to avoid any late fees or service interruptions. This notification is for informational purposes and provides a summary of the charges incurred."
    },
    {
      title: "Payment Reminder",
      description: "Due in 3 days. Avoid fees.",
      date: "August 28, 2024",
      time: "08:00 AM",
      details: "This is a friendly reminder that your payment of $156.75 for the August 2024 bill is due in three days. To ensure continuous service and avoid a late payment fee of $15.00, please submit your payment immediately. You can make a payment through your online account, via the mobile app, or by calling our automated payment line. Failure to pay by the deadline may result in service interruption."
    },
    {
      title: "Payment Received",
      description: "$145.20 paid for July 2024",
      date: "July 31, 2024",
      time: "02:45 PM",
      details: "We have successfully received your payment of $145.20 for the July 2024 billing cycle. Your account balance is now zero. Thank you for your prompt payment. If you have any questions about this transaction or your account status, please contact customer support with the reference number provided in your payment confirmation email. Your continued trust in our services is appreciated."
    },
    {
      title: "High Usage Alert",
      description: "Usage 25% higher than last month",
      date: "September 5, 2024",
      time: "04:30 PM",
      details: "Your energy consumption has increased by 25% compared to the previous month. This significant spike is often caused by factors like increased air conditioning use, appliance malfunction, or seasonal changes. We recommend reviewing your home's energy usage patterns and checking for any leaks or equipment running unnecessarily to reduce your next bill. Visit the 'Energy Tips' section of our website for conservation strategies."
    },
    {
      title: "Payment Overdue",
      description: "Pay now to avoid interruption",
      date: "September 1, 2024",
      time: "09:00 AM",
      details: "Action Required: Your bill for August 2024 is currently overdue. To prevent the interruption of your utility services, please remit the outstanding balance of $156.75 immediately. Service may be disconnected if payment is not received within 48 hours of this notice. Please disregard this alert if payment has been made in the last 24 hours."
    },
    {
      title: "Peak Hours Info",
      description: "Save costs: use off-peak hours",
      date: "October 10, 2024",
      time: "06:00 AM",
      details: "Optimize your savings! Remember that peak electricity usage hours are typically between 4 PM and 9 PM on weekdays. By shifting high-energy tasks, such as running the dishwasher, washing machine, or dryer, to off-peak hours (like late evening or overnight), you can significantly reduce your monthly utility costs. Check your rate plan details for exact peak hour schedules in your area."
    },
    {
      title: "Budget Billing",
      description: "Pay same amount each month",
      date: "October 20, 2024",
      time: "11:00 AM",
      details: "Enroll in our Budget Billing program to stabilize your monthly payments. Instead of fluctuating bills based on seasonal usage, you will pay a fixed, average amount of $140.00 each month. This helps simplify budgeting and avoids high unexpected bills in the winter or summer. Your account will be reviewed annually to adjust the payment amount based on your actual consumption."
    },{
      title: "Bill Generated",
      description: "Aug 2024 bill: $156.75",
      date: "August 15, 2024",
      time: "10:00 AM",
      details: "Your August 2024 utility bill has been successfully generated and is now available for viewing in your online portal. The total amount due is $156.75, which covers your electricity, water, and gas usage for the past billing cycle. Please review the usage breakdown and ensure payment is submitted before the due date to avoid any late fees or service interruptions. This notification is for informational purposes and provides a summary of the charges incurred."
    },
    {
      title: "Payment Reminder",
      description: "Due in 3 days. Avoid fees.",
      date: "August 28, 2024",
      time: "08:00 AM",
      details: "This is a friendly reminder that your payment of $156.75 for the August 2024 bill is due in three days. To ensure continuous service and avoid a late payment fee of $15.00, please submit your payment immediately. You can make a payment through your online account, via the mobile app, or by calling our automated payment line. Failure to pay by the deadline may result in service interruption."
    },
    {
      title: "Payment Received",
      description: "$145.20 paid for July 2024",
      date: "July 31, 2024",
      time: "02:45 PM",
      details: "We have successfully received your payment of $145.20 for the July 2024 billing cycle. Your account balance is now zero. Thank you for your prompt payment. If you have any questions about this transaction or your account status, please contact customer support with the reference number provided in your payment confirmation email. Your continued trust in our services is appreciated."
    },
    {
      title: "High Usage Alert",
      description: "Usage 25% higher than last month",
      date: "September 5, 2024",
      time: "04:30 PM",
      details: "Your energy consumption has increased by 25% compared to the previous month. This significant spike is often caused by factors like increased air conditioning use, appliance malfunction, or seasonal changes. We recommend reviewing your home's energy usage patterns and checking for any leaks or equipment running unnecessarily to reduce your next bill. Visit the 'Energy Tips' section of our website for conservation strategies."
    },
    {
      title: "Payment Overdue",
      description: "Pay now to avoid interruption",
      date: "September 1, 2024",
      time: "09:00 AM",
      details: "Action Required: Your bill for August 2024 is currently overdue. To prevent the interruption of your utility services, please remit the outstanding balance of $156.75 immediately. Service may be disconnected if payment is not received within 48 hours of this notice. Please disregard this alert if payment has been made in the last 24 hours."
    },
    {
      title: "Peak Hours Info",
      description: "Save costs: use off-peak hours",
      date: "October 10, 2024",
      time: "06:00 AM",
      details: "Optimize your savings! Remember that peak electricity usage hours are typically between 4 PM and 9 PM on weekdays. By shifting high-energy tasks, such as running the dishwasher, washing machine, or dryer, to off-peak hours (like late evening or overnight), you can significantly reduce your monthly utility costs. Check your rate plan details for exact peak hour schedules in your area."
    },
    {
      title: "Budget Billing",
      description: "Pay same amount each month",
      date: "October 20, 2024",
      time: "11:00 AM",
      details: "Enroll in our Budget Billing program to stabilize your monthly payments. Instead of fluctuating bills based on seasonal usage, you will pay a fixed, average amount of $140.00 each month. This helps simplify budgeting and avoids high unexpected bills in the winter or summer. Your account will be reviewed annually to adjust the payment amount based on your actual consumption."
    }
  ];


  const [selectedIndex, setSelectedIndex] = useState(0)
  const [bigScreenNotification, setBigScreenNotification] = useState(Notifications[0]);


  useEffect(() => {
    setBigScreenNotification(Notifications[selectedIndex])
  }, [selectedIndex])

  const handlCardClick = (idx) => {
    setSelectedIndex(idx);
    // console.log("From Parent Component Clicked !!")
  }

  return (
    <div className={`flex flex-row h-full justify-evenly text-center`}>
      <div className={`w-2/5 ${theme.background.sidebar} mr-5 flex flex-col justify-start items-center overflow-y-scroll no-scrollbar`}>
        {
          Notifications.map((notification, index) => {
            const isActive = (index === selectedIndex)
            const wrapperClass = `${isActive} ? 'w-full md:w-full transform scale-[1.02]' : 'w-full md:w-full' transition-all duration-300`
            return (
              <div key = {notification.title + index} className={wrapperClass}>
                <NotificationCard
                  title={notification.title}
                  description={notification.description}
                  onClick={() => handlCardClick(index)}
                  isActive={isActive}
                />
              </div>
            )
          })
        }
        <p className='mt-5'></p>

      </div>
      <div className={`w-3/5 ${theme.background.sidebar} flex flex-col justify-start items-center p-10`}>
        {bigScreenNotification ? (
          <>
            <div className='flex justify-between w-full'>
              <div className='text-lg font-semibold'>{bigScreenNotification.title}</div>
              <div  className='text-sm text-right'>
                <div>{bigScreenNotification.date}</div>
                <div className='mt-1'>{bigScreenNotification.time}</div>
              </div>
            </div>
            <div className='mt-6 text-sm w-full text-left'>{bigScreenNotification.description}</div>
            <div className='mt-6 text-sm text-left'>{bigScreenNotification.details}</div>

          </>) : <>No Notification is Selected.</>}
      </div>
    </div>
  )
}