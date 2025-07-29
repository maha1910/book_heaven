import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from '../../supabaseConfig';
import emailjs from '@emailjs/browser';

const NotifyUser = ({ userEmail, userName, bookId, bookName }) => {
  const [countdown, setCountdown] = useState(10);
  const [timer, setTimer] = useState(null);

  const subscribeToNotifications = async () => {
    const { data, error } = await supabase
      .from('book_notifications')
      .insert([{ user_email: userEmail, user_name: userName, book_id: bookId }]);

    if (error) {
      console.error('Error subscribing:', error);
    } else {
      console.log('User subscribed to notifications.');
      startCountdown(); // only start if subscribed successfully
    }
  };

  const startCountdown = () => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) {
          clearInterval(interval);
          notifyUsers();
        }
        return prev - 1;
      });
    }, 1000);
    setTimer(interval);
  };

  const notifyUsers = async () => {
    const { data: usersToNotify, error } = await supabase
      .from('book_notifications')
      .select('*')
      .eq('book_id', bookId);

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    usersToNotify.forEach(user => {
      emailjs.send(
        'service_juf82qd',
        'template_uyrquug',
        {
          user_name: user.user_name,
          book_name: bookName,
          user_email: user.user_email
        },
        'TVgWmuwDjNa3A2ObH'
      )
      .then(res => {
        console.log(`✅ Email sent to ${user.user_email}`);
      })
      .catch(err => {
        console.error(`❌ Email failed to ${user.user_email}`, err);
      });
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Countdown: {countdown > 0 ? countdown : "Email Sent!"}</Text>
      <Button
        title="Get Notified"
        onPress={subscribeToNotifications}
        disabled={countdown !== 10}
      />
    </View>
  );
};

export default NotifyUser;
