import React from 'react';
import { Formik } from 'formik';
import { Input, FormikDebug, Form, FormItem, SubmitButton, Select } from "formik-antd";
import clsx from 'clsx';
import styles from '../styles/filter.module.scss';
import CATEGORIES from '../graphql/categories.query';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';

const cities = [
    {
        "name": "All UAE",
        "value": "All UAE"
    },
    {
        "name": "Abu Dhabi",
        "value": "Abu Dhabi"
    },
    {
        "name": "Dubai",
        "value": "Dubai"
    },
    {
        "name": "Sharjah",
        "value": "Sharjah"
    },
    {
        "name": "Ajman",
        "value": "Ajman"
    },
    {
        "name": "Umm al Quwain",
        "value": "Umm al Quwain"
    },
    {
        "name": "Ras al Khaimah",
        "value": "Ras al Khaimah"
    },
    {
        "name": "Fujairah",
        "value": "Fujairah"
    }
];



const Filter = () => {
    const router = useRouter();
    const { product, category, city = 'All UAE' } = router.query;
    const { loading, error, data } = useQuery(CATEGORIES, {
        fetchPolicy: "cache-and-network"
    })

    const onSubmit = (values: IFilter, actions: any) => {
        actions.setSubmitting(false);
        if (values.whatAreYouLookingFor.trim() || category !== values.category) {
            router.push({
                pathname: '/search',
                search: `what_are_you_looking_for=${values.whatAreYouLookingFor}&category=${values.category}&city=${values.city}`
            });
        } else {
            router.push({
                pathname: `/${category}/${product}`,
                search: `city=${values.city}`
            });
        }
    }
    const INIT_FILTER: any = {
        whatAreYouLookingFor: "",
        category: category || "All Categories",
        city: city || "All UAE"
    }

    const validateSearch = (event) => {
        const regex = new RegExp("^[a-zA-Z0-9\b]+$");
        const key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    }

    return (
        <div className={clsx("container", styles.filter)}>
            <Formik
                enableReinitialize={true}
                initialValues={INIT_FILTER}
                onSubmit={onSubmit}
            // validationSchema={ReviewSchema}
            >
                {() => (
                    <Form layout="vertical">
                        
                        <FormItem name="whatAreYouLookingFor">
                            <Input
                                onKeyPress={validateSearch}
                                name="whatAreYouLookingFor"
                                placeholder="What are you looking for?"
                                size="large"
                            />
                        </FormItem>
                        <FormItem name="category">
                            <Select
                                name="category"
                                placeholder="Select Category"
                                allowClear
                                size="large"
                                loading={loading}
                            >
                                <Select.Option key="All Categories" value="All Categories">All Categories</Select.Option>
                                {data?.categories.map((category: any) => (
                                    <Select.Option key={category.name} value={category.id}>{category.name}</Select.Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem name="city">
                            <Select
                                name="city"
                                placeholder="Select City"
                                allowClear
                                size="large"
                            >
                                {cities.map((city: any, key: number) => (
                                    <Select.Option key={key} value={city.value}>{city.name}</Select.Option>
                                ))}
                            </Select>
                        </FormItem>
                        <SubmitButton size="large" style={{ width: "100%" }}>Show Results</SubmitButton>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Filter;