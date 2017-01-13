<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        //'css/site.css',
        'gentella-vendors/font-awesome/css/font-awesome.min.css',
        'gentella-vendors/nprogress/nprogress.css',     
        'gentella-vendors/iCheck/skins/flat/green.css',
        'gentella-vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css',   
        'gentella-vendors/bootstrap-daterangepicker/daterangepicker.css',
        'gentella-vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',   
        'css/custom.min.css',
    ];
    public $js = [
        'gentella-vendors/bootstrap/dist/js/bootstrap.min.js',
        'gentella-vendors/iCheck/icheck.min.js',
        'gentella-vendors/Chart.js/dist/Chart.min.js',
        'gentella-vendors/fastclick/lib/fastclick.js',
        'gentella-vendors/nprogress/nprogress.js',   
        'gentella-vendors/moment/min/moment.min.js',
        'gentella-vendors/bootstrap-daterangepicker/daterangepicker.js',
        'gentella-vendors/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',            
        'js/custom.min.js',
        'js/zizap.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}