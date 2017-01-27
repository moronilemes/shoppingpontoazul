<?php

namespace app\controllers;

class DashboardController extends \yii\web\Controller
{
    public function actionOrder()
    {
        return $this->render('order');
    }
    
    public function actionTest()
    {
        return $this->render('test');
    }
    
    
    public function actionSetting()
    {
        return $this->render('setting');
    }
    
    public function actionProduct()
    {
        return $this->render('product');
    }
    
    public function actionCalendar()
    {
        return $this->render('calendar');
    }
    
    public function actionChartjs()
    {
        return $this->render('chartjs');
    }
    
    public function actionChartjs2()
    {
        return $this->render('chartjs2');
    }

    public function actionE_commerce()
    {
        return $this->render('e_commerce');
    }
    
    public function actionEcharts()
    {
        return $this->render('echarts');
    }
    
    public function actionFixed_footer()
    {
        return $this->render('fixed_footer');
    }
    
    public function actionFixed_sidebar()
    {
        return $this->render('fixed_sidebar');
    }
    
    public function actionForm()
    {
        return $this->render('form');
    }
    
    public function actionForm_advanced()
    {
        return $this->render('form_advanced');
    }
    
    public function actionForm_buttons()
    {
        return $this->render('form_buttons');
    }
    
    public function actionForm_upload()
    {
        return $this->render('form_upload');
    }
    
    public function actionForm_validation()
    {
        return $this->render('form_validation');
    }
    
    public function actionForm_wizards()
    {
        return $this->render('form_wizards');
    }
    
    public function actionGeneral_elements()
    {
        return $this->render('general_elements');
    }
    
    public function actionGlyphicons()
    {
        return $this->render('glyphicons');
    }
    
    public function actionIcons()
    {
        return $this->render('icons');
    }
    
    public function actionInbox()
    {
        return $this->render('inbox');
    }
    
    public function actionIndex()
    {
        return $this->render('index');
    }
    
    public function actionIndex2()
    {
        return $this->render('index2');
    }
    
    public function actionIndex3()
    {
        return $this->render('index3');
    }
    
    public function actionInvoice()
    {
        return $this->render('invoice');
    }
    
    public function actionLevel2()
    {
        return $this->render('level2');
    }
    public function actionLogin()
    {
        return $this->render('login');
    }
    
    public function actionMap()
    {
        return $this->render('map');
    }
    
    public function actionMedia_gallery()
    {
        return $this->render('media_gallery');
    }
    
    public function actionMorisjs()
    {
        return $this->render('morisjs');
    }
    
    public function actionOther_charts()
    {
        return $this->render('other_charts');
    }
    
    public function actionPage_403()
    {
        return $this->render('page_403');
    }
    
    public function actionPage_404()
    {
        return $this->render('page_404');
    }
    
    public function actionPage_500()
    {
        return $this->render('page_500');
    }
    
    public function actionPlain_page()
    {
        return $this->render('plain_page');
    }
    
    public function actionPricing_tables()
    {
        return $this->render('pricing_tables');
    }
    
    public function actionProfile()
    {
        return $this->render('profile');
    }
    
    public function actionProject_detail()
    {
        return $this->render('project_detail');
    }
    
    public function actionProjects()
    {
        return $this->render('projects');
    }
    
    public function actionTables()
    {
        return $this->render('tables');
    }
    
    public function actionTables_dynamic()
    {
        return $this->render('tables_dynamic');
    }
    
    public function actionTeste_zizap()
    {
        return $this->render('teste_zizap');
    }
    
    public function actionTypography()
    {
        return $this->render('typography');
    }
    
    public function actionWidgets()
    {
        return $this->render('widgets');
    }
    
    public function actionXx()
    {
        return $this->render('xx');
    }
        
}
