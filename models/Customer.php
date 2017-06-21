<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%customer}}".
 *
 * @property integer $id
 * @property integer $store
 * @property string $name
 * @property string $email
 * @property string $phone
 *
 * @property Chat[] $chats
 * @property Store $store0
 */
class Customer extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%customer}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['store', 'email'], 'required'],
            [['id', 'store'], 'integer'],
            [['name'], 'string', 'max' => 120],
            [['email'], 'string', 'max' => 100],
            [['phone'], 'string', 'max' => 45],
            //[['store'], 'exist', 'skipOnError' => true, 'targetClass' => Store::className(), 'targetAttribute' => ['store' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => Yii::t('app', 'ID'),
            'store' => Yii::t('app', 'Store'),
            'name' => Yii::t('app', 'Name'),
            'email' => Yii::t('app', 'Email'),
            'phone' => Yii::t('app', 'Phone'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getChats()
    {
        return $this->hasMany(Chat::className(), ['customer' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStore0()
    {
        return $this->hasOne(Store::className(), ['id' => 'store']);
    }
}
