import { useMutation } from '@apollo/react-hooks';
import { Button, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { Formik, FormikProps } from "formik";
import { Input, FormikDebug, Form, FormItem, Rate, SubmitButton } from "formik-antd";
import gql from 'graphql-tag';
import { useRouter } from 'next/router';
import React, { FC, useRef } from 'react';
import REVIEWS_OF_SUPPLIER from '../graphql/reviews-of-supplier.query';
import * as Yup from 'yup';

const ADD_REVIEW = gql`
    mutation addReview($review: String!, $rating: Float!, $supplierId: ID!) {
        addReview(review: $review, rating: $rating, supplierId: $supplierId) {
            id
            review
            rating
            reviewOn {
                id
                contactPerson
            }
            reviewBy {
                id
                name
            }
        }
    }
`;

const ReviewSchema = Yup.object().shape({
    review: Yup.string().required("Review is required").max(160),
    rating: Yup.number().required("Rating is required").min(0).max(5)
});



interface IParams {
    supplierId: string | undefined;
}

const AddReview: FC = () => {
    console.log("AddReview");
    const router = useRouter();
    const { supplier } = router.query;
    const formRef = useRef<FormikProps<any>>(null);
    const [addReview] = useMutation(ADD_REVIEW, {
        onCompleted: (data) => {
            formRef.current && formRef.current.resetForm()
            if (data.addReview) {
                message.success('Review Added!');
            } else {
                message.error('Something Error!');
            }
        },
        onError: error => {
            console.info("onError");
            console.log(error.message);
            message.error(error.message);
            // message.error(JSON.stringify(error));
        },
        refetchQueries: [
            {
                query: REVIEWS_OF_SUPPLIER,
                variables: { id: supplier }
            }
        ]
    });

    const onSubmit = (values: any, actions: any) => {
        console.log("Form Submit")
        console.log(values);
        addReview({
            variables: {
                "review": values.review,
                "rating": values.rating,
                "supplierId": supplier
            }
        });
    }

    return (
        <Formik
            enableReinitialize={true}
            innerRef={formRef}
            initialValues={{
                review: "",
                rating: 0
            }}
            onSubmit={onSubmit}
            validationSchema={ReviewSchema}
        >
            {() => (
                <Form layout="vertical">
                    <FormItem name="review" label="Your review">
                        <Input.TextArea
                            name="review"
                            placeholder="Write something..."
                            showCount
                            maxLength={160}
                            size="large"
                        />
                    </FormItem>
                    <div>
                        <FormItem style={{ width: "50%" }} name="rating" label="Rating">
                            <Rate name="rating" />
                        </FormItem>
                        <SubmitButton>Add Review</SubmitButton>
                    </div>
                    {/* <FormikDebug /> */}
                </Form>
            )}
        </Formik>
    )
}

export default AddReview;