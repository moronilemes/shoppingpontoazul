<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%store}}".
 *
 * @property integer $id
 * @property string $name
 * @property string $phone
 * @property string $mobile
 * @property string $observation
 * @property string $address
 * @property string $address2
 * @property string $postal_code
 * @property string $city
 * @property string $state
 * @property string $country
 * @property string $pay_day
 * @property string $CPF
 * @property string $CNPJ
 * @property string $IE
 * @property string $RG
 * @property string $store_type
 *
 * @property UserStoreRole[] $userStoreRoles
 */
class Store extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%store}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['name', 'address', 'postal_code', 'city', 'state', 'store_type'], 'required'],
            [['pay_day'], 'string'],
            [['name'], 'string', 'max' => 100],
            [['phone', 'mobile', 'address', 'address2', 'postal_code', 'city', 'state', 'country'], 'string', 'max' => 45],
            [['observation'], 'string', 'max' => 200],
            [['CPF'], 'string', 'max' => 11],
            [['CNPJ', 'RG'], 'string', 'max' => 15],
            [['IE'], 'string', 'max' => 12],
            [['store_type'], 'string', 'max' => 1],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'name' => Yii::t('app', 'Name'),
            'phone' => Yii::t('app', 'Phone'),
            'mobile' => Yii::t('app', 'Mobile'),
            'observation' => Yii::t('app', 'Observation'),
            'address' => Yii::t('app', 'Address'),
            'address2' => Yii::t('app', 'Address2'),
            'postal_code' => Yii::t('app', 'Postal Code'),
            'city' => Yii::t('app', 'City'),
            'state' => Yii::t('app', 'State'),
            'country' => Yii::t('app', 'Country'),
            'pay_day' => Yii::t('app', 'Pay Day'),
            'CPF' => Yii::t('app', 'CPF'),
            'CNPJ' => Yii::t('app', 'CNPJ'),
            'IE' => Yii::t('app', 'IE'),
            'RG' => Yii::t('app', 'RG'),
            'store_type' => Yii::t('app', 'Store Type'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserStoreRoles()
    {
        return $this->hasMany(UserStoreRole::className(), ['store_id' => 'id']);
    }
}
