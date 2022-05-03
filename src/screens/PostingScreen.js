import React from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import * as Yup from 'yup'

import { Form, FormField, SubmitButton } from '../components/forms'
import Screen from '../components/Screen'
import FormImagePicker from '../components/forms/FormImagePicker'

const validationSchema = Yup.object().shape({
  title: Yup.string().required('ป้อนชื่อสินค้าก่อน').min(1).label('Title'),
  price: Yup.number()
    .required('ป้อนราคาก่อน')
    .min(1, 'ราคาต้องมากกว่า 0')
    .max(10000)
    .label('Price'),
  description: Yup.string()
    .required('ป้อนราคาก่อน')
    .min(1)
    .label('Description'),
  images: Yup.array().min(1, 'เลือกรูปสินค้าอย่างน้อย 1 รูปก่อน'),
})

const PostingScreen = () => {
  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            title: '',
            price: '',
            description: '',
            category: null,
            images: [],
          }}
          onSubmit={values => console.log(values)}
          validationSchema={validationSchema}>
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="ชื่อสินค้า" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="ราคา"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="รายละเอียดสินค้า"
          />
          <SubmitButton title="ลงประกาศ" />
        </Form>
      </ScrollView>
    </Screen>
  )
}

export default PostingScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})
