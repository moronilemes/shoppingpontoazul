<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%chat}}".
 *
 * @property integer $store
 * @property integer $customer
 * @property string $message
 * @property string $timestamp
 *
 * @property Customer $customer0
 * @property Store $store0
 */
class Chat extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%chat}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['store', 'customer', 'message'], 'required'],
            [['store', 'customer'], 'integer'],
            [['timestamp'], 'safe'],
            [['message'], 'string', 'max' => 350],
            [['customer'], 'exist', 'skipOnError' => true, 'targetClass' => Customer::className(), 'targetAttribute' => ['customer' => 'id']],
            [['store'], 'exist', 'skipOnError' => true, 'targetClass' => Store::className(), 'targetAttribute' => ['store' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'store' => Yii::t('app', 'Store'),
            'customer' => Yii::t('app', 'Customer'),
            'message' => Yii::t('app', 'Message'),
            'timestamp' => Yii::t('app', 'Timestamp'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCustomer0()
    {
        return $this->hasOne(Customer::className(), ['id' => 'customer']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStore0()
    {
        return $this->hasOne(Store::className(), ['id' => 'store']);
    }
}
