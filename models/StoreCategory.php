<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "{{%store_category}}".
 *
 * @property integer $id
 * @property integer $store
 * @property integer $category
 *
 * @property Category $category0
 * @property Store $store0
 */
class StoreCategory extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%store_category}}';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['store', 'category'], 'required'],
            [['store', 'category'], 'integer'],
            [['category'], 'exist', 'skipOnError' => true, 'targetClass' => Category::className(), 'targetAttribute' => ['category' => 'id']],
            [['store'], 'exist', 'skipOnError' => true, 'targetClass' => Store::className(), 'targetAttribute' => ['store' => 'id']],
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
            'category' => Yii::t('app', 'Category'),
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getCategory0()
    {
        return $this->hasOne(Category::className(), ['id' => 'category']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStore0()
    {
        return $this->hasOne(Store::className(), ['id' => 'store']);
    }
}
