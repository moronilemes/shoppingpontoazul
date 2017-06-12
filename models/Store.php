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
 * @property string $slot
 * @property string $CPF
 * @property string $CNPJ
 * @property string $IE
 * @property string $RG
 * @property string $plan
 *
 * @property Chat[] $chats
 * @property Customer[] $customers
 * @property Customer[] $customers0
 * @property Product[] $products
 * @property StoreCategory[] $storeCategories
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
            [['name', 'slot', 'plan'], 'required'],
            [['name'], 'string', 'max' => 100],
            [['phone', 'mobile', 'slot'], 'string', 'max' => 45],
            [['observation'], 'string', 'max' => 200],
            [['CPF'], 'string', 'max' => 11],
            [['CNPJ', 'RG'], 'string', 'max' => 15],
            [['IE'], 'string', 'max' => 12],
            [['plan'], 'string', 'max' => 1],
            [['image'], 'string', 'max' => 255],
            [['image'],'file','extensions'=>'jpg,png','skipOnEmpty'=>true]
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
            'slot' => Yii::t('app', 'Slot'),
            'CPF' => Yii::t('app', 'Cpf'),
            'CNPJ' => Yii::t('app', 'Cnpj'),
            'IE' => Yii::t('app', 'Ie'),
            'RG' => Yii::t('app', 'Rg'),
            'plan' => Yii::t('app', 'Plan'),
            'image' => Yii::t('app', 'Image'),
        ];
    }

    public static function findIdentity($id)
    {
        return static::findOne(['id' => $id]);
    }


    /**
     * @return \yii\db\ActiveQuery
     */
    public function getChats()
    {
        return $this->hasMany(Chat::className(), ['store' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCustomers()
    {
        return $this->hasMany(Customer::className(), ['id' => 'customer'])->viaTable('{{%chat}}', ['store' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCustomers0()
    {
        return $this->hasMany(Customer::className(), ['store' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getProducts()
    {
        return $this->hasMany(Product::className(), ['store_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStoreCategories()
    {
        return $this->hasMany(StoreCategory::className(), ['store' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUserStoreRoles()
    {
        return $this->hasMany(UserStoreRole::className(), ['store_id' => 'id']);
    }
}
